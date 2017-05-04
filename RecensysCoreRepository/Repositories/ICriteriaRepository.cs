using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecensysCoreRepository.DTOs;

namespace RecensysCoreRepository.EFRepository.Repositories
{
    public interface ICriteriaRepository: IDisposable
    {
        CriteriaDTO Read(int studyId);
        bool Update(int studyId, CriteriaDTO dto);
    }
}
