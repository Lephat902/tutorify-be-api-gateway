import { FileTypeValidator } from '@nestjs/common';

export class NormalFileTypeValidator extends FileTypeValidator {
  constructor() {
    super({
      fileType: /.(jpg|jpeg|png|pdf|doc|docx|ppt|pptx|xls|xlsx|txt)/,
    });
  }

  buildErrorMessage(): string {
    return 'The valid file formats are jpg, jpeg, png, pdf, doc, docx, ppt, pptx, xls, xlsx, and txt.';
  }
}
