// services/patient.service.ts
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Patient } from "./models/patient.model";
import * as bcrypt from "bcrypt";
import { MailService } from "../mail/mail.service";
import { JwtTokenService } from "../auth/JwtService";
import { Response as ExpressResponse } from "express";
import { Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { Prescription } from "../prescription/models/prescription.model";
import { PrescriptionItem } from "../prescription_item/models/prescription_item.model";
import { Medication } from "../medication/models/medication.model";
import { Doctor } from "../doctor/models/doctor.model";
import { MedicalRecord } from "../medical_record/models/medical_record.model";
import { LabTest } from "../lab_test/models/lab_test.model";

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient)
    private readonly patientModel: typeof Patient,
    @InjectModel(Prescription) // Prescription uchun @InjectModel qo‘shildi
    private readonly prescriptionModel: typeof Prescription,
    private readonly mailService: MailService,
    private readonly myjwtService: JwtTokenService,
    private readonly jwtService: JwtService
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const { password, confirm_password } = createPatientDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }

    const hashed_password = await bcrypt.hash(password, 7);

    const newPateint = await this.patientModel.create({
      ...createPatientDto,
      hashed_password,
      role: "patient",
    });

    try {
      await this.mailService.sendMail(newPateint);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("emailga xat yuborishda xatolik");
    }

    return newPateint;
  }

  async findAll() {
    return this.patientModel.findAll();
  }

  async findOne(id: number) {
    const patient = await this.patientModel.findByPk(id);
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return patient;
  }

  async findByEmail(email: string) {
    const patient = await this.patientModel.findOne({ where: { email } });
    if (!patient) {
      throw new NotFoundException(`Patient with Email: ${email} not found`);
    }
    return patient;
  }

  async update(id: number, updateDto: UpdatePatientDto) {
    const patient = await this.findOne(id);
    return patient.update(updateDto);
  }

  async remove(id: number) {
    const patient = await this.findOne(id);
    await patient.destroy();
    return { message: `Patient #${id} deleted` };
  }

  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }

    const updatedUser = await this.patientModel.update(
      { is_active: true },
      {
        where: {
          activation_link: link,
          is_active: false,
        },
        returning: true, //effected
      }
    );

    if (!updatedUser[1][0]) {
      throw new BadRequestException("User already activated");
    }

    return {
      message: "User activated successfully",
      is_active: updatedUser[1][0].is_active,
    };
  }

  async refreshTokens(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token)
      throw new BadRequestException("Refresh Token mavjud emas!");

    const payload = await this.myjwtService.verifyRefreshToken(refresh_token);

    const user = await this.patientModel.findOne({
      where: { id: payload.id },
    });
    if (!user || !user.refresh_token) {
      throw new UnauthorizedException(
        "Patient topilmadi yoki login qilinmagan"
      );
    }

    const isValid = await bcrypt.compare(refresh_token, user.refresh_token);
    if (!isValid) throw new UnauthorizedException("Refresh Token noto'g'ri");

    // console.log(user)
    const { accessToken, refreshToken } =
      await this.myjwtService.generateTokens({
        id: user.id,
        email: user.email,
        role: "patient",
        is_active: user.is_active,
      });

    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    user.refresh_token = hashed_refresh_token;
    await user.save();

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    return res.status(200).json({
      success: true,
      token: accessToken,
    });
  }

  async getMedicationsForPatient(patientId: number): Promise<any[]> {
    const prescriptions = await this.prescriptionModel.findAll({
      where: { patient_id: patientId },
      include: [
        {
          model: PrescriptionItem,
          include: [Medication],
        },
      ],
    });

    return prescriptions.map((prescription) => ({
      prescription_id: prescription.id,
      created_at: prescription.created_at,
      medications: prescription.prescriptionItems.map((item) => ({
        name: item.medication?.name,
        dosage: item.dosage,
        frequency: item.frequency,
        duration: item.duration,
      })),
    }));
  }

  async getPatientMedicalHistory(patientId: number, user: any){
   
    const patient = await this.patientModel.findOne({
      where: { id: patientId },
      attributes: ['id', 'full_name', 'email', 'birth_date', 'gender'],
      include: [
        {
          model: MedicalRecord,
          attributes: ['id', 'diagnosis', 'treatment', 'created_at'],
          include: [
            {
              model: Doctor,
              attributes: ['full_name', 'specialization'],
            },
          ],
        },
        {
          model: Prescription,
          attributes: ['id', 'created_at'],
          include: [
            {
              model: PrescriptionItem,
              attributes: ['dosage', 'frequency', 'duration'],
              include: [
                {
                  model: Medication,
                  attributes: ['name', 'dosage_form'],
                },
              ],
            },
            {
              model: Doctor,
              attributes: ['full_name', 'specialization'],
            },
          ],
        },
        {
          model: LabTest,
          attributes: ['id', 'test_type', 'status', 'result', 'date'],
          include: [
            {
              model: Doctor,
              attributes: ['full_name', 'specialization'],
            },
          ],
        },
      ],
    });

    return patient
  }

  
}
