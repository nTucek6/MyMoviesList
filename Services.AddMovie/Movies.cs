﻿using Entities;


namespace Services.MoviesAdmin
{
    public class Movies
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

        public byte[] MovieImageData { get; set; }

    }
}
