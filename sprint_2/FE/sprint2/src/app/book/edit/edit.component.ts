import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BookService} from '../../service/book/book.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {IBook} from '../../model/book/IBook';
import {NotifierService} from 'angular-notifier';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  uploadedAvatar = null;
  bookEditForm: FormGroup;
  idBook: number;
  bookEdit: IBook = {};

  bookDetail: IBook = {
    bookPromotionId: {},
    bookAuthorId: {},
    bookCategoryId: {}
  };
  private oldAvatarLink: any;

  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute,
              private storage: AngularFireStorage,
              private router: Router,
              private notification: NotifierService,
  ) {
  }

  ngOnInit(): void {
    // this.topFunction();
    this.activatedRoute.paramMap.subscribe((param) => {
      this.idBook = +param.get('id');
      this.bookService.getBookById(this.idBook).subscribe(
        (data) => {
          this.bookEdit = data;
          this.bookEditForm = new FormGroup({
              bookId: new FormControl(this.bookEdit.bookId),
              bookCode: new FormControl(this.bookEdit.bookCode),
              bookName: new FormControl(this.bookEdit.bookName),
              bookImage: new FormControl(this.bookEdit.bookImage),
              bookContent: new FormControl(this.bookEdit.bookContent),
              bookPrice: new FormControl(this.bookEdit.bookPrice),
              bookTranslator: new FormControl(this.bookEdit.bookTranslator),
              bookTotalPage: new FormControl(this.bookEdit.bookTotalPage),
              bookSize: new FormControl(this.bookEdit.bookSize),
              bookPublishDate: new FormControl(this.bookEdit.bookPublishDate),
              bookQuantity: new FormControl(this.bookEdit.bookQuantity),
              bookPublisher: new FormControl(this.bookEdit.bookPublisher),
              bookCategoryId: new FormControl(this.bookEdit.bookCategoryId),
              bookAuthorId: new FormControl(this.bookEdit.bookAuthorId),
              bookPromotionId: new FormControl(this.bookEdit.bookPromotionId),
            }
          );
        }
      );
    });
  }
  compare(o1: any, o2: any) {
    return o1 && o2 ? o1.id === o2.id : o1 = o2;
  }

  edit(id: number) {
    if (this.uploadedAvatar !== null) {
      // Upload img & download url
      const avatarName = this.getCurrentDateTime() + this.uploadedAvatar.name;
      const fileRef = this.storage.ref(avatarName);
      this.storage.upload(avatarName, this.uploadedAvatar).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.bookEditForm.patchValue({bookImage: url});

            // delete old img from firebase
            if (this.bookEdit.bookImage !== null) {
              this.storage.storage.refFromURL(this.bookEdit.bookImage).delete();
            }

            // Update employee
            this.bookService.editBook(this.bookEdit.bookId, this.bookEditForm.value).subscribe(
              () => {
              },
              (error) => {
                if (error.status === 403) {
                  this.router.navigateByUrl('/auth/access-denied');
                }
                console.log(error);
                if (error.status === 400) {
                  window.confirm('Vui lòng kiểm tra lại thông tin');
                }
                if (error.status === 404) {
                  window.confirm('Dữ liệu không tồn tại');
                }
              },
              () => {
                console.log('Success!');
                this.uploadedAvatar = null;
              },
            );
          });
        })
      ).subscribe();
    } else {
      this.bookService.editBook(this.bookEdit.bookId, this.bookEditForm.value).subscribe(
        () => {
        },
        (error) => {
          if (error.status === 403) {
            this.router.navigateByUrl('/auth/access-denied');
          }
          if (error.status === 400) {
            window.alert('Vui lòng kiểm tra lại thông tin');
            // this.returnErrors = error.error;
            // console.log(this.returnErrors.employeeName);
            // continue handle each error if needed
          }
        },
        () => {
          console.log('success');
          // this.router.navigateByUrl('/employee/detail/' + this.bookEdit.bookId);
        }
      );
    }
  }
  getAvatar(event: any) {
    this.uploadedAvatar = event.target.files[0];
    if (this.uploadedAvatar) {
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedAvatar);
      reader.onload = (e: any) => {
        this.oldAvatarLink = e.target.result;
      };
    }
  }

  private getCurrentDateTime() {
    return new Date().getTime();
  }

}
