using System;
using System.Collections.Generic;
using RecensysCoreRepository.DTOs;

namespace RecensysCoreRepository.Repositories
{
    public interface IStudyMemberRepository: IDisposable
    {
        ICollection<StudyMemberDTO> Get(int studyId);
        bool Update(int studyId, StudyMemberDTO[] dtos);
    }
}