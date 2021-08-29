using MediatR;

namespace Services.TodoColumnCommand.Commands.CreateColumn
{
    public class CreateColumnCommand: IRequest<long>
    {
        public CreateColumnCommand(string columnName)
        {
            ColumnName = columnName;
        }

        public string ColumnName { get; set; }
    }
}