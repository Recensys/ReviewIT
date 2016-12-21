using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;
using RecensysCoreRepository.DTOs;

namespace RecensysCoreBLL
{
    public interface IReviewTaskLogic
    {
        bool Update(ReviewTaskDTO dto);
        void Commit(ICollection<int> ids);
    }
}