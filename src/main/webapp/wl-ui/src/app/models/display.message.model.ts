export class DisplayMessageModel {
  private messageType: 'error' | 'info'
  private messageText: string;

  reset(): void {
    this.messageText = '';
  }

  static create(): DisplayMessageModel {
    return new DisplayMessageModel();
  }

  newInfoMessage(messageText: string): void {
    this.messageType = 'info';
    this.messageText = messageText;
  }

  newErrorMessage(messageText: string): void {
    this.messageType = 'error';
    this.messageText = messageText;
  }

  get MessageType() {
    return this.messageType;
  }

  get MessageText() {
    return this.messageText;
  }

  isError(): boolean {
    return this.messageType === 'error';
  }

  isInfo(): boolean {
    return this.messageType === 'info';
  }

  isEmpty(): boolean {
    return this.messageText === '';
  }

  hasContent(): boolean {
    return this.messageText && this.messageText.length > 0;
  }
}
