using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecensysCoreRepository.DTOs;

namespace RecensysCoreRepository.Repositories
{
    public interface IStudySourceRepository: IDisposable
    {
        void Post(int studyId, ICollection<StudySourceItemDTO> dto);

    }
}
