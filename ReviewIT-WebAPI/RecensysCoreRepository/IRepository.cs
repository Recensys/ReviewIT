using System;
using System.Collections.Generic;

namespace RecensysCoreRepository
{
    public interface IRepository<T> : IDisposable
    {
        T Read(int id);
        IEnumerable<T> GetAll();

        int Create(T item);
        void Update(T item);

        void Delete(int id);
        void Delete(T item);
    }
}
