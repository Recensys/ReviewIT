using System.Collections.Generic;

namespace RecensysCoreRepository.DTOs
{
    public class UserTaskOverviewDTO
    {
        public UserDetailsDTO User { get; set; }
        public List<TaskProgressDTO> Progress { get; set; }
    }
}