using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using Repositories;

namespace Services.UserServiceCommands.Commands.SendLinkToEmail
{
    public class SendEmailCommandHandler: IRequestHandler<SendEmailCommand, string>
    {
        private readonly IUserRepository _repository;

        public SendEmailCommandHandler(IUserRepository repository)
        {
            _repository = repository;
        }
        
        public async Task<string> Handle(SendEmailCommand request, CancellationToken cancellationToken)
        {
            var user = _repository.GetUsersAsync().
                FirstOrDefaultAsync(x => x.Email == request.EmailAddress, cancellationToken: cancellationToken).Result;

            var guid = await _repository.AddUserEmailDataConfirmation(request.EmailAddress);
            var message = new MimeMessage();
            try
            {
                if (user == null) return ("Bad");
                message.From.Add(new MailboxAddress("Todo List", SendEmailCommand.EmailClientName));
                message.To.Add(new MailboxAddress(user.FirstName, request.EmailAddress));
                message.Subject = "Message from Todo List";
                message.Body = new BodyBuilder()
                    {
                        HtmlBody = $"<a href=\"https://localhost:5001/ConfirmationPassword/{guid}\" style\"color: green;\">" +
                                   $"<div style=\"color: green;\">Чтобы поменять пароль на другой, пройдите по этой ссылке</div></div></a>"
                                   
                    }.ToMessageBody();

                using var client = new MailKit.Net.Smtp.SmtpClient();
                
                await client.ConnectAsync("smtp.gmail.com", 465, true, cancellationToken); 
                await client.AuthenticateAsync(SendEmailCommand.EmailClientName,
                    SendEmailCommand.EmailClientPassword, cancellationToken);
                await client.SendAsync(message, cancellationToken);

                await client.DisconnectAsync(true, cancellationToken);
                return "";

            }
            catch (Exception e)
            {
                return e.GetBaseException().Message;
            }
        }
    }
}