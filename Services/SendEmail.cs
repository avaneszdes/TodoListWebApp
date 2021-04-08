using System;
using System.Linq;
using MimeKit;
using Repositories;
using Services.EmailDto;

namespace Services
{
    public class EmailSender
    {
        private readonly IAdminRepository _repository;

        public EmailSender(IAdminRepository repository)
        {
            _repository = repository;
        }

        public string SendEmailCustom(Email email)
        {
            Email emailData = new Email();
            var user = _repository.GetUsers().FirstOrDefault(x => x.Email == email.EmailAddress);
            try
            {
                if (user != null)
                {
                    MimeMessage message = new MimeMessage();
                    message.From.Add(new MailboxAddress("Todo List", emailData.EmailClientName));
                    message.To.Add(new MailboxAddress(user.FirstName, email.EmailAddress));
                    message.Subject = "Message from Todo List";
                    message.Body = new BodyBuilder()
                        {
                            HtmlBody = $"<div style=\"color: black;\">Your password: " +
                                       $"<div style=\"color: green;\">{user.Password}</div></div>"
                        }
                        .ToMessageBody();

                    using (MailKit.Net.Smtp.SmtpClient client = new MailKit.Net.Smtp.SmtpClient())
                    {
                        client.Connect("smtp.gmail.com", 465, true); //либо использум порт 465
                        client.Authenticate(emailData.EmailClientName,
                            emailData.EmailClientPassword); //логин-пароль от аккаунта
                        client.Send(message);

                        client.Disconnect(true);
                        return "";
                    }
                }

                return ("Bad");
            }
            catch (Exception e)
            {
                return e.GetBaseException().Message;
            }
        }
    }
}