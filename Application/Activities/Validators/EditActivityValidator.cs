using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Validators
{
    public class EditActivityValidator : BaseActivityValidator<EditActivity.Command, EditActivityDto>
    {
        public EditActivityValidator() : base(x => x.ActivityDto)
        {
            RuleFor(x => x.ActivityDto.Id)
            .NotEmpty().WithMessage("Id required.");
        }
    }
}