using System.Net;
using System.Net.Mail;


namespace Services.EmailSender
{
    public class EmailSenderService : IEmailSenderService
    {
        public Task SendEmailAsync(string email, string subject, string message)
        {
            var mail = "nikola.tucek@vuv.hr";
            var pw = "p4yTS8dp";

            var client = new SmtpClient("smtp-mail.outlook.com",587)
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(mail,pw)
            };

            return client.SendMailAsync(
                new MailMessage(from: mail,
                                to: email,
                                subject,
                                message));

        }
    }
}
