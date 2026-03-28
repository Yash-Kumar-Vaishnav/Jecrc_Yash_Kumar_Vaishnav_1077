using Microsoft.EntityFrameworkCore;
using HackerBank.API.Data;
using HackerBank.API.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins(
                "http://localhost:4200",
                "http://localhost:4201",
                "https://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new()
    {
        Title = "HackerBank API",
        Version = "v1",
        Description = "REST API for HackerBank transaction management"
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "HackerBank API v1");
    c.RoutePrefix = "swagger";
});

app.UseCors("AllowAngular");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

    try
    {
        context.Database.Migrate();

        if (!context.Transactions.Any())
        {
            var seedData = new List<Transaction>
            {
                new() { Date = "2019-12-01", Description = "THE HACKERUNIVERSITY DES: CCD+ ID:0000232343", Type = 0, Amount = 1000.00m, Balance = "$12,234.45" },
                new() { Date = "2019-11-25", Description = "HACKERBANK DES:DEBIT O ID: 000098794578789797987", Type = 1, Amount = 2450.45m, Balance = "$12,234.45" },
                new() { Date = "2019-11-29", Description = "HACKERBANK DES: CREDIT O ID:1223232323", Type = 1, Amount = 999.00m, Balance = "$10,928" },
                new() { Date = "2019-12-03", Description = "HACKERBANK INC. DES:CCD+ ID: 33375894749", Type = 0, Amount = 1985.40m, Balance = "$12,234.45" },
                new() { Date = "2019-11-29", Description = "HACKERBANK1 BP DES: MERCH PMT ID:1358570", Type = 0, Amount = 1520.34m, Balance = "$12,234.45" },
                new() { Date = "2019-11-29", Description = "HACKERBANK DES: DEBIT O ID:00097494729", Type = 0, Amount = 564.00m, Balance = "$12,234.45" },
                new() { Date = "2019-11-30", Description = "CREDIT CARD PAYMENT ID: 222349083", Type = 1, Amount = 1987.00m, Balance = "$12,234.45" }
            };

            context.Transactions.AddRange(seedData);
            await context.SaveChangesAsync();
            logger.LogInformation("Seeded {Count} transactions.", seedData.Count);
        }
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Database seeding failed. API will still start.");
    }
}

app.Run();
