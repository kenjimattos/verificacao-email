export function getEmailTemplate(verificationLink: string): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verificação de E-mail</title>
    <style type="text/css">
        body, p, h1, h2, h3, h4, h5, h6, table, td {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
        }
        body {
            background-color: #f8f8f8;
            margin: 0;
            padding: 0;
        }
        table {
            border-spacing: 0;
            border-collapse: collapse;
        }
        @media only screen and (max-width: 600px) {
            .container { width: 100% !important; }
            .content { padding: 10px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td style="padding: 20px 0;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.05);" class="container">
                    <tr>
                        <td bgcolor="#ffffff" style="padding: 30px;" class="content">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td style="color: #555555; font-size: 16px; line-height: 24px; padding-bottom: 30px; text-align: center;">
                                        <h3 style="padding-bottom: 10px;">Bem-vindo!</h3>
                                        <p>Clique no botão abaixo para verificar seu e-mail.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding-bottom: 20px;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                                            <tr>
                                                <td align="center" style="border-radius: 30px; background-color: #0FADEB; padding: 15px 40px;">
                                                    <a href="${verificationLink}" target="_blank" style="color: #ffffff; font-size: 16px; font-weight: bold; text-decoration: none;">VERIFICAR E-MAIL</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 20px; color: #666666; font-size: 13px; text-align: center;">
                                        <p>Caso o botão não funcione, copie e cole o link:</p>
                                        <p style="word-break: break-all; color: #555555;">${verificationLink}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px; color: #999999; font-size: 12px; text-align: center;">
                                        <p>Este link expira em 5 minutos.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}
