import { IMailProvider } from "../../IMailProvider";
import nodemailer, { Transporter } from "nodemailer";
import { SES } from "aws-sdk";
import { injectable } from "tsyringe";

import fs from "fs";
import handlebars from "handlebars";

@injectable()
class mailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
        this.client = nodemailer.createTransport({
            SES: new SES({
                apiVersion: "2010-12-01",
                region: process.env.AWS_REGION_SES,
            })
        });

    };

    async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString("utf-8");
        const templateParse = handlebars.compile(templateFileContent);

        const templateHtml = templateParse(variables);

        await this.client.sendMail({
            to,
            from: "isqualhamTech <faleconosco@isqualhamtech.com.br>",
            subject,
            html: templateHtml
        });
    };
}
export { mailProvider }