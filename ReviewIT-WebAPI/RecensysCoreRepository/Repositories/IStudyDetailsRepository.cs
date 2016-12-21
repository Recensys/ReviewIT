using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecensysCoreRepository.DTOs;

namespace RecensysCoreRepository.Repositories
{
    public interface IStudyDetailsRepository: IDisposable
    {
        IEnumerable<StudyDetailsDTO> GetAll();
        IEnumerable<StudyDetailsDTO> GetAll(int userId);
        StudyDetailsDTO Read(int id);
        bool Update(StudyDetailsDTO dto);
        int Create(StudyDetailsDTO dto);
        bool Delete(int id);
        IEnumerable<int> GetStageIds(int studyId);
    }
}
