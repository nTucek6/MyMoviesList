using Entities;
using Microsoft.AspNetCore.Http;

namespace Services.MoviesAdmin
{
    public class SaveMovie
    {
        public int Id { get; set; }

        public string? MovieName { get; set; }

        public string? Synopsis { get; set; }

        public string Genres { get; set; }

        public string Director { get; set; }

        public string Writers { get; set; }

      //  public List<SaveActor> Actors { get; set; }
        public string Actors { get; set; }

        public DateTime ReleaseDate { get; set; }

        public decimal Duration { get; set; }

        public IFormFile? MovieImageData { get; set; }

    }
}
