import { ApplicationStatus } from '@tutorify/shared';

export class TutorApplyForClassDto {
  id: string;
  classId: string;
  tutorId: string;
  status: ApplicationStatus;
  isDesignated: boolean;
  appliedAt: Date;
  approvedAt: Date;
}