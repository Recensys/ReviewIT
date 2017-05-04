using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RecensysCoreRepository.EFRepository.Entities
{

    public class CriteriaResult
    {
        public int Id { get; set; }
        public int ArticleId { get; set; }
        public Article Article { get; set; }
        public int StageId { get; set; }
        public Stage Stage { get; set; }
        public int CriteriaId { get; set; }
        public Criteria Criteria { get; set; }
    }
}
