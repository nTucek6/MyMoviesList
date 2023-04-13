using Entities;
using Microsoft.AspNetCore.Http;

namespace Services.MoviesAdmin
{
    public class SaveMovie
    {
        public int Id { get; set; }

        public string? MovieName { get; set; }

        public string? Synopsis { get; set; }

        public List<GenresSelect> Genres { get; set; }

        public List<PeopleEntity> Director { get; set; }

        public List<PeopleEntity> Writers { get; set; }

        public List<PeopleEntity> Actors { get; set; }

        public DateTime ReleaseDate { get; set; }

        public decimal Duration { get; set; }

        public IFormFile MovieImageData { get; set; }

    }
}
