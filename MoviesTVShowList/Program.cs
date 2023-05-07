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

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
}));

// Add services to the container.

builder.Services.AddControllers();

//connection to database
builder.Services.AddDbContext<MyMoviesListContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("ConnectionString")));


//Configuration -------------------------------------------------------------------------
builder.Services.Configure<JwtConfiguration>(builder.Configuration.GetSection("JwtConfiguration"));

// ---------------------------------------------------------------------------------

//Services -------------------------------------------------------------------------
builder.Services.AddTransient<IAuthenticationService, AuthenticationService>();
builder.Services.AddTransient<IUsersAdminService, UsersAdminService>();
builder.Services.AddTransient<IMoviesAdminService, MoviesAdminService>();
builder.Services.AddTransient<IPersonAdminService, PersonAdminService>();
builder.Services.AddTransient<IProfileService, ProfileService>();
builder.Services.AddTransient<IDiscussionsService, DiscussionsService>();
builder.Services.AddTransient<IMovieSearchService, MovieSearchService>();
builder.Services.AddTransient<IFrontpageService, FrontpageService>();

// ---------------------------------------------------------------------------------

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseCors("MyPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run(); 