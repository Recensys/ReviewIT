using System.Collections.Generic;

namespace RecensysCoreRepository.DTOs
{
    public class TaskOverviewDTO
    {
        public List<StageDetailsDTO> Stages { get; set; }
        public List<UserTaskOverviewDTO> UserTasks { get; set; }
    }
}