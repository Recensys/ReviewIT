using System;
using System.Collections.Generic;
using RecensysCoreRepository.DTOs;

namespace RecensysCoreRepository.Repositories
{
    public interface IUserDetailsRepository: IDisposable
    {

        IEnumerable<UserDetailsDTO> Get();
        IEnumerable<UserDetailsDTO> GetForStudy(int studyId);
        bool Update(int studyId, ICollection<UserDetailsDTO> dtos);
        UserDetailsDTO Create(UserDetailsDTO dto);
        int GetIdFromIdentity(string str);
    }
}