using MediatR;

namespace Services.UserServiceCommands.Commands.SendLinkToEmail
{
    public class SendEmailCommand: IRequest<string>
    {
        public SendEmailCommand(string emailAddress)
        {
            EmailAddress = emailAddress;
        }

        public string EmailAddress { get; }
        public static string EmailClientName => "ivavivanoviartem@gmail.com";
        public static string EmailClientPassword => "Create,a,strong,password";
    }
}