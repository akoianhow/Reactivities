using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class GetActivityDetail
    {
        public class Query : IRequest<Result<Activity>>
        {
            public required string Id { get; set; }
        }

        public class Handler(AppDbContext context) :
        IRequestHandler<Query, Result<Activity>>
        {
            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {

                var activity = await context.Activities.FindAsync([request.Id], cancellationToken);

                if (activity == null) return Result<Activity>.Failure("Activity not found", 404);

                return Result<Activity>.Success(activity);
            }
        }
    }
}