using System.Collections.Generic;

namespace RecensysCoreRepository.DTOs
{

    public class ReviewTaskListDTO
    {
        public ICollection<TaskFieldDTO> Fields { get; set; }
        
        public ICollection<ReviewTaskDTO> Tasks { get; set; }

    }

}