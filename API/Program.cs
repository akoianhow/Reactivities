using System.CodeDom;
using API.Middleware;
using Application.Activities.Commands;
using Application.Activities.Queries;
using Application.Activities.Validators;
using Application.Core;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();
builder.Services.AddMediatR(x =>
{
    x.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>();
    x.AddOpenBehavior(typeof(ValidationBehavior<,>));
}
);
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);
builder.Services.AddValidatorsFromAssemblyContaining<CreateActivityValidator>();
builder.Services.AddTransient<ExceptionMiddleware>();
var app = builder.Build();


//Configure the HTTP Request Pipepline
app.UseMiddleware<ExceptionMiddleware>();
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000", "https://localhost:3000"));

app.MapControllers();
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;


app.Use(async (contet, next) =>
{
    string art = @"
.__           .__  .__                               .__       .___
|  |__   ____ |  | |  |   ____   __  _  _____________|  |    __| _/
|  |  \_/ __ \|  | |  |  /  _ \  \ \/ \/ /  _ \_  __ \  |   / __ | 
|   Y  \  ___/|  |_|  |_(  <_> )  \     (  <_> )  | \/  |__/ /_/ | 
|___|  /\___  >____/____/\____/    \/\_/ \____/|__|  |____/\____ | 
     \/     \/                                                  \/ 
    ";
    Console.Clear();
    Console.WriteLine(art);
    Console.WriteLine(DateTime.Now.ToString().ToUpper());
    Console.WriteLine("========== MIDDLEWARE ONE BEFORE =========");
    await next();
    Console.WriteLine("========== MIDDLEWARE ONE AFTER =========");
});

app.Use(async (context, next) =>
{
    Console.WriteLine("XXXXXXXX MIDDLEWARE TWO BEFORE XXXXXXXXXXX");
    await next();
    Console.WriteLine("XXXXXXXX MIDDLEWARE TWO BEFORE XXXXXXXXXXX");
});

try
{
    var context = services.GetRequiredService<AppDbContext>();
    await context.Database.MigrateAsync();
    await DbInitializer.SeedData(context);
}
catch (System.Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred duting migration.");
    throw;
}

app.Run();
