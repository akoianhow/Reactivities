using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Validators
{
    public class BaseActivityValidator<T, TDto> : AbstractValidator<T> where TDto : BaseActivityDto
    {
        public BaseActivityValidator(Func<T, TDto> selector)
        {
            RuleFor(x => selector(x).Title)
                   .NotEmpty()
                   .MaximumLength(100).WithMessage("only up to 100 chars.")
                   .WithMessage("Title is required.");
            RuleFor(x => selector(x).Description)
            .NotEmpty()
            .WithMessage("Description sis required.");
            RuleFor(x => selector(x).Date)
            .GreaterThan(DateTime.UtcNow).WithMessage("Must be future");

        }
    }
}