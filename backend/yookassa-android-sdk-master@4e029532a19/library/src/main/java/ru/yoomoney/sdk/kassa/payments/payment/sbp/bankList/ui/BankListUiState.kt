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

package ru.yoomoney.sdk.kassa.payments.payment.sbp.bankList.ui

import ru.yoomoney.sdk.kassa.payments.payment.sbp.bankList.BankList
import ru.yoomoney.sdk.kassa.payments.payment.sbp.bankList.model.SbpBankInfoDomain

internal sealed interface BankListUiState {
    object Progress : BankListUiState

    data class ShortBankListStatusProgress(
        val shortBankList: List<SbpBankInfoDomain>,
        val fullBankList: List<SbpBankInfoDomain>,
    ) : BankListUiState

    data class FullBankListStatusProgress(
        val fullBankList: List<SbpBankInfoDomain>,
        val showBackNavigation: Boolean,
    ) : BankListUiState

    data class Error(
        val throwable: Throwable,
    ) : BankListUiState

    data class ShortBankListContent(
        val shortBankList: List<SbpBankInfoDomain>,
        val fullBankList: List<SbpBankInfoDomain>,
    ) : BankListUiState

    data class FullBankListContent(
        val bankList: List<SbpBankInfoDomain>,
        val showBackNavigation: Boolean,
        val searchText: String = "",
        val searchedBanks: List<SbpBankInfoDomain> = emptyList(),
    ) : BankListUiState

    data class PaymentShortBankListStatusError(
        val throwable: Throwable,
        val shortBankList: List<SbpBankInfoDomain>,
        val fullBankList: List<SbpBankInfoDomain>,
    ) : BankListUiState

    data class PaymentFullBankListStatusError(
        val throwable: Throwable,
        val bankList: List<SbpBankInfoDomain>,
        val showBackNavigation: Boolean,
    ) : BankListUiState

    data class ActivityNotFoundError(val throwable: Throwable, val previosListState: BankList.State) : BankListUiState
}

internal fun BankList.State.mapToUiState(): BankListUiState = when (this) {
    is BankList.State.Progress -> BankListUiState.Progress
    is BankList.State.ShortBankListStatusProgress -> BankListUiState.ShortBankListStatusProgress(
        shortBankList,
        fullBankList
    )

    is BankList.State.FullBankListStatusProgress -> BankListUiState.FullBankListStatusProgress(
        fullBankList,
        showBackNavigation
    )

    is BankList.State.ShortBankListContent -> BankListUiState.ShortBankListContent(shortBankList, fullBankList)
    is BankList.State.FullBankListContent -> BankListUiState.FullBankListContent(
        bankList,
        showBackNavigation,
        searchText,
        searchedBanks
    )

    is BankList.State.ActivityNotFoundError -> BankListUiState.ActivityNotFoundError(throwable, previosListState)
    is BankList.State.Error -> BankListUiState.Error(throwable)
    is BankList.State.PaymentShortBankListStatusError -> BankListUiState.PaymentShortBankListStatusError(
        throwable,
        shortBankList,
        fullBankList
    )

    is BankList.State.PaymentFullBankListStatusError -> BankListUiState.PaymentFullBankListStatusError(
        throwable,
        bankList,
        showBackNavigation
    )
}