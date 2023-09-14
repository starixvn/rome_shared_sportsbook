namespace Fanex.PTEngine.Services
{
    using Fanex.Logging;
    using Fanex.PTEngine.BusinessObjects;
    using Fanex.PTEngine.DataAccess;
    using System;
    using System.Collections;

    public class BettingLimitService : IBettingLimitService
    {
        private const int SportsbookProductId = 1;

        private ICustomerDataAccess customerDataAccess;

        public BettingLimitService() : this(null)
        {
        }

        public BettingLimitService(ICustomerDataAccess customerDataAccess)
        {
            this.customerDataAccess = customerDataAccess ?? new CustomerDataAccess();
        }

        /// <summary>
        /// Get BetSetting For Edit
        /// </summary>
        /// <param name="requestContext">The context of Edit</param>
        /// <returns>Return a IBettingLimit contains current</returns>
        public IBettingLimit<BettingLimitItem> GetBettingForEdit(IRequestContext context)
        {
            return customerDataAccess.Age_CustomerSelBetSetting(context);
        }

        /// <summary>
        /// Update Bet Setting
        /// </summary>
        /// <param name="bettingLimit"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public Result UpdateBetting(IBettingLimit<BettingLimitItem> bettingLimit, IRequestContext context)
        {
            Result result = new Result();
            var checkUmResult = customerDataAccess.CheckPartialUM(context.CustId, SportsbookProductId, context.LangKey);
            if (!checkUmResult.ErrorCode.Equals("0"))
            {
                result = new Result(checkUmResult.ErrorCode.ToString(), checkUmResult.ErrorMessage);
                return result;
            }

            try
            {
                var parameters = new Hashtable();
                parameters.Add("custid", context.TargetCustId);
                parameters.Add("userid", context.CustId);
                parameters.Add("subaccid", context.SubAccId);
                parameters.Add("language", context.Language);
                parameters.Add("ip", context.IP);

                bettingLimit.MapToSpParameters(context, parameters);
                result = customerDataAccess.Age_CustomerUpdMemBetSetting(parameters);
            }
            catch (Exception ex)
            {
                LogService.Error(ex.Message);
                throw new Exception("Update Bet Setting is failed", ex);
            }

            if (result.ErrorCode == string.Empty && result.ErrorMessage == string.Empty)
            {
                result.ErrorCode = Constant.ERROR_CODE;
                result.ErrorMessage = Constant.ERROR_MESSAGE;
            }

            return result;
        }

        public Result UpdateMultipleBettingForSuper(IBettingLimit<BettingLimitItem> bettingLimit, IRequestContext context, Hashtable updateParameters)
        {
            Result result = new Result();
            var checkUmResult = customerDataAccess.CheckPartialUM(context.CustId, SportsbookProductId, context.LangKey);
            if (!checkUmResult.ErrorCode.Equals("0"))
            {
                result = new Result(checkUmResult.ErrorCode.ToString(), checkUmResult.ErrorMessage);
                return result;
            }

            try
            {
                var parameters = new Hashtable();
                parameters.Add("custid", context.TargetCustId);
                parameters.Add("userid", context.CustId);
                parameters.Add("subaccid", context.SubAccId);
                parameters.Add("language", context.Language);
                parameters.Add("ip", context.IP);
                parameters.Add("updatemultiple", 1);
                parameters.Add("updatemultiplesuper", 1);

                bettingLimit.MapToSpParameters(context, parameters);
                bettingLimit.MapToSpUpdateMultipleBetSettingOnlyParameters(ref parameters, updateParameters);
                result = customerDataAccess.Age_CustomerUpdMemBetSetting(parameters);
            }
            catch (Exception ex)
            {
                LogService.Error(ex.Message);
                throw new Exception("Update Bet Setting is failed", ex);
            }

            if (result.ErrorCode == string.Empty && result.ErrorMessage == string.Empty)
            {
                result.ErrorCode = Constant.ERROR_CODE;
                result.ErrorMessage = Constant.ERROR_MESSAGE;
            }

            return result;
        }
    }
}