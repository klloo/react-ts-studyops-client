import Modal from 'components/Modal';
import React, { useCallback, useEffect } from 'react';
import { Container, TitleDiv, ContentForm } from './style';
import useInput from 'hooks/useInput';

function SetAccountPopup({
  show,
  onClose,
  modifyAccount,
  originAccount,
}: {
  show: boolean;
  onClose: () => void;
  modifyAccount: (account: string) => void;
  originAccount: string | null;
}) {
  const [bank, onChangeBank, setBank] = useInput('');
  const [account, onChangeAccount, setAccount] = useInput('');
  const [accountHolder, onChangeAccountHolder, setAccountHolder] = useInput('');

  // 필드 정보 초기화
  const setOriginInfo = useCallback(() => {
    if (!originAccount) {
      setBank('');
      setAccount('');
      setAccountHolder('');
    } else {
      const accountParse = originAccount.split(',');
      setBank(accountParse[0]);
      setAccount(accountParse[1]);
      if (accountParse.length === 3) {
        setAccountHolder(accountParse[2]);
      }
    }
  }, [originAccount]);

  useEffect(() => {
    setOriginInfo();
  }, [originAccount]);

  // 팝업 닫기
  const closeModal = useCallback(() => {
    onClose();
    setOriginInfo();
  }, [originAccount]);

  // 폼 제출 핸들러
  const onSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const bankStr = bank.replace(/,/g, '');
      const accountStr = account.replace(/,/g, '');
      const accountHolderStr = accountHolder.replace(/,/g, '');
      if (!bankStr.trim() || !accountStr.trim()) {
        return;
      }
      let accountInfo = `${bankStr},${accountStr}`;
      if (accountHolderStr) {
        accountInfo = `${accountInfo},${accountHolderStr}`;
      }
      modifyAccount(accountInfo);
    },
    [bank, account, accountHolder],
  );

  return (
    <Modal show={show} onCloseModal={closeModal}>
      <Container>
        <TitleDiv>
          납부 계좌 설정 <div onClick={closeModal}>&times;</div>
        </TitleDiv>
        <ContentForm onSubmit={onSubmitForm}>
          <input placeholder="은행" value={bank} onChange={onChangeBank} />
          <input
            placeholder="계좌번호"
            value={account}
            onChange={onChangeAccount}
          />
          <input
            placeholder="예금주 (선택)"
            value={accountHolder}
            onChange={onChangeAccountHolder}
          />
          <button>확인</button>
        </ContentForm>
      </Container>
    </Modal>
  );
}

export default SetAccountPopup;
