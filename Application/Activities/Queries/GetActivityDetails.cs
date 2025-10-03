using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class GetActivityDetail
    {
        public class Query : IRequest<Activity>
        {
            public required string Id { get; set; }
        }

        public class Handler(AppDbContext context) :
        IRequestHandler<Query, Activity>
        {
            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {

                var activity = await context.Activities.FindAsync([request.Id], cancellationToken);

                if (activity == null) throw new Exception("Activity not found");

                return activity;
            }
        }
    }
}