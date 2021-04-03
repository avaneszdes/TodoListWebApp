using System;
using MimeKit;

namespace Services
{
    public static class EmailSender
    {
        public static string SendEmailCustom(string usersEmail)
        {
            try
            {
                MimeMessage message = new MimeMessage();
                message.From.Add(new MailboxAddress("Todo List", "ivavivanoviartem@gmail.com")); //отправитель сообщения
                message.To.Add(new MailboxAddress(usersEmail)); //адресат сообщения
                message.Subject = "Message from Todo List"; //тема сообщения
                message.Body = new BodyBuilder() {HtmlBody = "<div style=\"color: green;\">Your password</div>"}
                    .ToMessageBody(); //тело сообщения (так же в формате HTML)

                using (MailKit.Net.Smtp.SmtpClient client = new MailKit.Net.Smtp.SmtpClient())
                {
                    client.Connect("smtp.gmail.com", 587, true); //либо использум порт 465
                    client.Authenticate("ivavivanoviartem@gmail.com", "Create,a,strong,password"); //логин-пароль от аккаунта
                    client.Send(message);

                    client.Disconnect(true);
                    return ("Сообщение отправлено успешно!");
                }
            }
            catch (Exception e)
            {
                return e.GetBaseException().Message;
            }
        }
    }
}