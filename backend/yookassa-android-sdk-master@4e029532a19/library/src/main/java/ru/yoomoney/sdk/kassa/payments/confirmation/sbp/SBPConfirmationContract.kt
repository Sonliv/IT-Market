/*
 * The MIT License (MIT)
 * Copyright © 2023 NBCO YooMoney LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the “Software”), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
 * OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

package ru.yoomoney.sdk.kassa.payments.confirmation.sbp

import ru.yoomoney.sdk.kassa.payments.model.PaymentStatus
import ru.yoomoney.sdk.kassa.payments.model.UserPaymentProcess

internal class SBPConfirmationContract {

    internal sealed class State {
        object Loading : State()
        data class LoadingDataFailed(val throwable: Throwable) : State()
    }

    internal sealed class Action {
        data class GetConfirmationDetails(
            val confirmationData: String,
        ) : Action()

        data class GetConfirmationDetailsSuccess(
            val paymentId: String,
            val confirmationUrl: String,
        ) : Action()

        data class GetConfirmationDetailsFailed(
            val throwable: Throwable,
        ) : Action()

        data class GetPaymentDetailsSuccess(
            val confirmationUrl: String,
            val paymentId: String,
            val status: PaymentStatus,
            val userPaymentProcess: UserPaymentProcess?,
        ) : Action()

        data class GetPaymentDetailsFailed(
            val throwable: Throwable,
        ) : Action()
    }

    internal sealed class Effect {
        object SendFinishState : Effect()
        data class ContinueSBPConfirmation(
            val confirmationUrl: String,
            val paymentId: String,
        ) : Effect()
    }
}
