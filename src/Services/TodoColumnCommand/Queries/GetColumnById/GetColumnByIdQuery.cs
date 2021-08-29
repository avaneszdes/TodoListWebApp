using System.Collections.Generic;
using Entities;
using MediatR;

namespace Services.TodoColumnCommand.Queries.GetColumnById
{
    public class GetColumnByIdQuery: IRequest<TodoColumn>
    {
        public GetColumnByIdQuery(long columnId)
        {
            ColumnId = columnId;
        }

        public long ColumnId  { get; set; }
    }
}