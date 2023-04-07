using Entities;
using Microsoft.EntityFrameworkCore;

namespace DatabaseContext
{
    public class MyMoviesListContext : DbContext
    {
        public MyMoviesListContext(DbContextOptions<MyMoviesListContext> options) : base(options)
        {
        }

        public DbSet<PeopleEntity> People { get; set; }
        public DbSet<MoviesEntity> Movies { get; set; }
        public DbSet<DiscussionsCommentsEntity> DiscussionsComments { get; set; }
        public DbSet<DiscussionsEntity> Discussions { get; set; }
        public DbSet<MovieReviewsEntity> MovieReviews { get; set; }
        public DbSet<UsersEntity> Users { get; set; }
        public DbSet<UsersMovieListEntity> UsersMovieList { get; set; }
        public DbSet<MoviesDirector> MoviesDirector { get; set; }
        public DbSet<MoviesActors> MoviesActors { get; set; }
        public DbSet<MoviesWriters> MoviesWriters { get; set; }
    }
}
