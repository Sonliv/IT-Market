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

package ru.yoomoney.sdk.kassa.payments.contract.savePayment

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import ru.yoomoney.sdk.guiCompose.theme.YooTheme
import ru.yoomoney.sdk.guiCompose.views.buttons.PrimaryButtonView
import ru.yoomoney.sdk.guiCompose.views.topbar.TopBarDefault
import ru.yoomoney.sdk.kassa.payments.R

@Composable
internal fun SavePaymentMethodScreen(
    title: CharSequence,
    info: CharSequence,
    onBack: () -> Unit,
    actionText: String,
    onButtonClick: () -> Unit,
    additionalInfo: CharSequence?,
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(YooTheme.colors.theme.tintBg)
            .verticalScroll(rememberScrollState()),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        TopBarDefault(onNavigationClick = onBack, navigationPainter = painterResource(R.drawable.ym_ic_close))
        TextInfoContent(
            modifier = Modifier
                .verticalScroll(rememberScrollState())
                .weight(1f),
            title = title,
            info = info,
            additionalInfo = additionalInfo
        )
        PrimaryButtonView(
            modifier = Modifier
                .fillMaxWidth()
                .padding(YooTheme.dimens.spaceS),
            text = actionText
        ) { onButtonClick() }
    }
}

@Composable
private fun TextInfoContent(
    modifier: Modifier,
    title: CharSequence,
    info: CharSequence, additionalInfo: CharSequence?,
) {
    Column(modifier = modifier) {
        TitleText(title.toString())
        BodyText(info.toString())
        additionalInfo?.let {
            BodyText(it.toString())
        }
    }
}

@Composable
private fun TitleText(text: String) {
    Text(
        modifier = Modifier
            .fillMaxWidth()
            .padding(YooTheme.dimens.spaceS),
        text = text,
        color = YooTheme.colors.type.primary,
        style = YooTheme.typography.title1
    )
}

@Composable
private fun BodyText(text: String) {
    Text(
        modifier = Modifier
            .fillMaxWidth()
            .padding(YooTheme.dimens.spaceS),
        text = text,
        color = YooTheme.colors.type.primary,
        style = YooTheme.typography.body
    )
}