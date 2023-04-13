namespace Entities
{
    public class MoviesEntity
    {
        public int Id { get; set; }

        public string MovieName { get; set; }

        public string Synopsis { get; set; }

        public string Genres { get; set; }

      //  public string Director { get; set; }

      //  public string Writers { get; set; }

       // public string Actors { get; set; }

        public DateTime ReleaseDate { get; set; }
        
        public decimal Duration { get; set; }

        public decimal? Rating { get; set; }

        public byte[] MovieImageData { get; set; }
    }
}
