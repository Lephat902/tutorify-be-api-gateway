import { MaxFileSizeValidator, ParseFilePipe } from "@nestjs/common";
import { CustomFileTypeValidator } from "src/common/file-validators";

export async function validatePortfolios(portfolios: Express.Multer.File[]) {
    await Promise.all(portfolios.map(async (file) => {
        return await new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({
                    maxSize: 1024 * 1024 * 20,
                    message: 'Maximum file size is 20MB',
                }),
                new CustomFileTypeValidator(),
            ],
        }).transform(file);
    }));
}