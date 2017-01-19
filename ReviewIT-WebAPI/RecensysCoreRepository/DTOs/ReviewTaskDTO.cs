using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecensysCoreRepository.DTOs
{
    public enum TaskState
    {
        Unknown, New, InProgress, Done
    }

    public class ReviewTaskDTO
    {
        public int Id { get; set; }
        public int ArticleId { get; set; }
        public ICollection<DataDTO> Data { get; set; }
        public TaskState TaskState { get; set; }
    }
}
