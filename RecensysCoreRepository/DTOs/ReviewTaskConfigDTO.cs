using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecensysCoreRepository.DTOs
{
    public class ReviewTaskConfigDTO
    {
        public int ArticleId { get; set; }
        public ICollection<int> RequestedFieldIds { get; set; }
        public int OwnerId { get; set; }
    }
}
