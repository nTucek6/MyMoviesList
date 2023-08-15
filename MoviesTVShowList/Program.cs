using DatabaseContext;
using Microsoft.EntityFrameworkCore;
using MyMoviesList.Configuration;
using Services.MoviesAdmin;
using Services.Authentication;
using Services.UsersAdmin;
using Services.PersonAdmin;
using Services.Profile;
using Services.Discussions;
using Services.MovieSearch;
using Services.Frontpage;
using Services.MovieInfo;
using Services.PersonInfo;
using MyMoviesList.Extensions;
using MyMoviesList.Service;
using Services.UserSupport;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
}));

// Add services to the container.

builder.Services.AddControllers();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


//connection to database
builder.Services.AddDbContext<MyMoviesListContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("ConnectionString")));


//Configuration -------------------------------------------------------------------------
builder.Services.Configure<JwtConfiguration>(builder.Configuration.GetSection("JwtConfiguration"));

// ---------------------------------------------------------------------------------

builder.Services.AddLogging();
builder.Services.AddTransient<Middleware>();

//Services -------------------------------------------------------------------------
builder.Services.AddTransient<IAuthenticationService, AuthenticationService>();
builder.Services.AddTransient<IUsersAdminService, UsersAdminService>();
builder.Services.AddTransient<IMoviesAdminService, MoviesAdminService>();
builder.Services.AddTransient<IPersonAdminService, PersonAdminService>();
builder.Services.AddTransient<IProfileService, ProfileService>();
builder.Services.AddTransient<IDiscussionsService, DiscussionsService>();
builder.Services.AddTransient<IMovieSearchService, MovieSearchService>();
builder.Services.AddTransient<IFrontpageService, FrontpageService>();
builder.Services.AddTransient<IMovieInfoService, MovieInfoService>();
builder.Services.AddTransient<IPersonInfoService, PersonInfoService>();
builder.Services.AddTransient<IUserSupportService, UserSupportService>();

builder.Services.AddHostedService<CalculateScoreTimer>();
// ---------------------------------------------------------------------------------


var app = builder.Build();

// Configure the HTTP request pipeline.

if(app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseCors("MyPolicy");

app.UseAuthorization();

app.UseMiddleware<Middleware>();

app.MapControllers();

app.Run(); 