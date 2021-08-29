using MediatR;

namespace Services.TodoColumnCommand.DeleteColumnById
{
    public class DeleteColumnByIdCommand: IRequest
    {
        public DeleteColumnByIdCommand(long id)
        {
            ColumnId = id;
        }

        public long ColumnId { get; set; }
    }
}