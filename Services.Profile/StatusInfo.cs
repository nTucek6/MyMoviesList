using Entities.Enum;


namespace Services.Profile
{
    public class StatusInfo
    {
        public StatusEnum Id { get; set; }
        public string Status { get; set; }
        public int StatusCount { get; set; }

    }
}
