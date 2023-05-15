using Fanex.Data;
using System.Collections;
using System.Data.SqlClient;

namespace Fanex.PTEngine
{
    public static class ObjectDbExtensions
    {
        public static int ExecuteNonQueryOnSiteDB(this ObjectDb objdb, Hashtable parameters, string dbServer)
        {
            string oldConnectionString = objdb.DbSetting.ConnectionString;
            objdb.DbSetting.ConnectionString = BuildConnectionString(dbServer, oldConnectionString);
            objdb.AssignParamValues(parameters);
            int result;
            try
            {
                result = objdb.ExecuteNonQuery();
            }
            finally
            {
                objdb.DbSetting.ConnectionString = oldConnectionString;
            }

            return result;
        }

        private static string BuildConnectionString(string serverIP, string connectionString)
        {
            var sqlConnectionStringBuilder = new SqlConnectionStringBuilder(connectionString)
            {
                DataSource = serverIP
            };

            return sqlConnectionStringBuilder.ToString();
        }
    }
}
