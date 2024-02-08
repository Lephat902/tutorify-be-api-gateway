import axios, { AxiosError, AxiosInstance } from 'axios';
import { HttpException } from '@nestjs/common';
import * as FormData from 'form-data';

export class FileService {
  private readonly httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: process.env.FILE_SERVICE_BASE_DOMAIN,
    });
  }

  private buildUrl(path: string): string {
    return `${this.httpClient.defaults.baseURL}${path}`;
  }

  private async handleRequest(requestPromise: Promise<any>) {
    try {
      const response = await requestPromise;
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        // convert AxiosError to HttpException
        console.log(error);
        throw new HttpException(error.response.data.message, error.response.data.statusCode);
      } else {
        throw error;
      }
    }
  }

  createPortfolios(tutorId: string, files: Express.Multer.File[]) {
    const url = this.buildUrl(`tutors/${tutorId}/upload/portfolio`);

    // Create a new FormData instance
    const formData = new FormData();

    // Append each file to the form data
    files.forEach((file) => {
      formData.append('files', file.buffer, file.originalname);
    });

    // Send the request
    return this.handleRequest(this.httpClient.post(url, formData));
  }

  uploadAvatar(file: Express.Multer.File) {
    const url = this.buildUrl('upload/avatar');
    
    // Create a new FormData instance
    const formData = new FormData();
    formData.append('avatar', file.buffer, file.originalname);
    
    // Send the request
    return this.handleRequest(this.httpClient.post(url, formData));
  }
  
  createSessionMaterials(sessionId: string, files: Express.Multer.File[]) {
    const url = this.buildUrl(`sessions/${sessionId}/upload/materials`);
    
    // Create a new FormData instance
    const formData = new FormData();
    
    // Append each file to the form data
    files.forEach((file) => {
      formData.append('files', file.buffer, file.originalname);
    });
    
    // Send the request
    return this.handleRequest(this.httpClient.post(url, formData));
  }
  

  getAllPortfoliosByTutorId(tutorId: string) {
    const url = this.buildUrl(`tutors/${tutorId}/portfolios`);
    return this.handleRequest(this.httpClient.get(url));
  }

  getAllSessionMaterialBySessionId(sessionId: string) {
    const url = this.buildUrl(`sessions/${sessionId}/materials`);
    return this.handleRequest(this.httpClient.get(url));
  }
}
