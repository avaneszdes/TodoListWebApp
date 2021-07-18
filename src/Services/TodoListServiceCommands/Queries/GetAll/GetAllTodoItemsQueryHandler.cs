using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Repositories;
using Services.DtoModels.TodoItemDto;

namespace Services.TodoListServiceCommands.Queries.GetAll
{
    public class GetAllTodoItemsQueryHandler : IRequestHandler<GetAllTodoItemsQuery, List<TodoItemDtoModel>>
    {
        private ITodoListRepository _repository;
        private readonly IIdentityService _identity;
        private readonly IMapper _mapper;

        public GetAllTodoItemsQueryHandler(ITodoListRepository repository, IIdentityService identity, IMapper mapper) {
            _repository = repository;
            _identity = identity;
            _mapper = mapper;
        }

        public async Task<List<TodoItemDtoModel>> Handle(GetAllTodoItemsQuery request,
            CancellationToken cancellationToken)
        {
            return await _repository.GetAll()
                .Where(x => x.UserId == _identity.GetUserId())
                .OrderBy(x => x.Id)
                .GetPage(request.Page, 10)
                .ProjectTo<TodoItemDtoModel>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken: cancellationToken);
        }
    }
}