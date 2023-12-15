const local = "http://localhost:3000"
const deploy = "http://52.221.249.20:3000/"
const useurl = local

const generateRandomString = (length) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

describe('TS-01: User registrasi pada halaman registrasi', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    Cypress.config("baseUrl",useurl)
    cy.visit('/login');
    cy.contains('daftar sekarang!').focus().click({ force: true })
  });

  it('TC-01: User registrasi dengan data yang valid', () => {
    const username = generateRandomString(8)
    const password = generateRandomString(8)

    cy.get('input').eq(0).type(username)
    cy.get('input').eq(1).type(password)
    cy.get('input').eq(2).type(password)
    cy.contains('register').focus().click({ force: true })
    cy.url().should('include', '/login')
  })

  it('TC-02: User registrasi dengan tidak mengisi data', () => {
    cy.get('button:contains("register")').should('be.disabled')
  })

  it('TC-03: User registrasi dengan tidak mengisi username', () => {
    cy.get('input').eq(1).type("123")
    cy.get('input').eq(2).type("123")
    cy.get('button:contains("register")').should('be.disabled')
  })

  it('TC-04: User registrasi dengan tidak mengisi password', () => {
    cy.get('input').eq(0).type("tes")
    cy.get('input').eq(2).type("123")
    cy.get('button:contains("register")').should('be.disabled')
  })

  it('TC-05: User registrasi dengan tidak mengisi konfirmasi password', () => {
    cy.get('input').eq(0).type("tes")
    cy.get('input').eq(1).type("123")
    cy.contains('register').focus().click({ force: true })
    cy.get('p:contains("Password dan konfirmasi password tidak sesuai.")')
    cy.url().should('not.include','/login')
  })
})

describe('TS-02: User login pada halaman login', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    Cypress.config("baseUrl",useurl)
    cy.visit('/login');
  });

  it('TC-01: User login dengan mengisi data yang valid', () => {
    cy.get('input').eq(0).type("tes")
    cy.get('input').eq(1).type("123")
    cy.get('button:contains("Login")').focus().click({ force: true })
    cy.url().should('include','/landingPage')
  })

  it('TC-02: User login dengan mengisi data yang tidak valid', () => {
    cy.get('input').eq(0).type("test")
    cy.get('input').eq(1).type("test")
    cy.get('button:contains("Login")').focus().click({ force: true })
    cy.get('p:contains("Username atau Password Salah !")')
    cy.url().should('include','/login')
  })

  it('TC-03: User login dengan tidak mengisi data', () => {
    cy.get('button:contains("Login")').should('be.disabled')
  })

  it('TC-04: User login dengan tidak mengisi username', () => {
    cy.get('input').eq(1).type("test123")
    cy.get('button:contains("Login")').should('be.disabled')
  })

  it('TC-05: User login dengan tidak mengisi password', () => {
    cy.get('input').eq(0).type("test123")
    cy.get('button:contains("Login")').should('be.disabled')
  })
})

describe('TS-03: User mengkases halaman homepage dan membeli produk', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    Cypress.config("baseUrl",useurl)
    cy.visit('/landingPage')
  });

  it('TC-01: User membeli produk dengan memasukkan kuantitas pesanan', () => {
    cy.contains('Mulai Belanja').focus().click({ force: true })
    cy.wait(2000);
    cy.get('button').eq(0).focus().click({ force: true })
    cy.get('input').eq(0).type('2')
    cy.get('button:contains("Checkout")').focus().click({ force: true })
    cy.url().should('include','/checkout/')
  })

  it('TC-02: User membeli produk dengan tidak memasukkan kuantitas pesanan', () => {
    cy.contains('Mulai Belanja').focus().click({ force: true })
    cy.wait(2000);
    cy.get('button').eq(0).focus().click({ force: true })
    cy.get('button:contains("Checkout")').focus().click({ force: true })
    cy.url().should('include','/dashboard')
  })
})

describe('TS-04: User mengkases halaman checkout', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    Cypress.config("baseUrl",useurl)
    cy.visit('/checkout/656e0c412bdae0ba3854fc44?qty=1')
  });

  it('TC-01: User checkout produk yang telah dibeli', () => {
    cy.wait(200)
    cy.get("button:contains('Ubah alamat pengiriman')").focus().click({ force: true })
    cy.wait(500)
    cy.get('textarea').type("Puri Indah Jatinangor No.21")
    cy.get('select').eq(0).select('JAWA BARAT')
    cy.wait(500)
    cy.get('select').eq(1).select('KABUPATEN SUMEDANG')
    cy.wait(500)
    cy.get('select').eq(2).select('JATINANGOR')
    cy.wait(500)
    cy.get('select').eq(3).select('CIKERUH')
    cy.contains('Simpan Alamat').focus().click({ force: true })
    cy.contains('Puri Indah Jatinangor No.21, Provinsi JAWA BARAT, KABUPATEN SUMEDANG, Kec. JATINANGOR, Kel/Desa. CIKERUH')
  })

  it('TC-02: User checkouut produk yang telah dibeli namun tidak memasukkan alamat', () => {
    cy.wait(200)
    cy.get("button:contains('Ubah alamat pengiriman')").focus().click({ force: true })
    cy.wait(500)
    cy.get('select').eq(0).select('JAWA BARAT')
    cy.wait(500)
    cy.get('select').eq(1).select('KABUPATEN SUMEDANG')
    cy.wait(500)
    cy.get('select').eq(2).select('JATINANGOR')
    cy.wait(500)
    cy.get('select').eq(3).select('CIKERUH')
    cy.get('button:contains("Simpan Alamat")').should('be.disabled')
  })

  it('TC-03: User checkout produk yang telah dibeli namun tidak memilih Provinsi', () => {
    cy.wait(200)
    cy.get("button:contains('Ubah alamat pengiriman')").focus().click({ force: true })
    cy.wait(500)
    cy.get('textarea').type("Puri Indah Jatinangor No.21")
    cy.wait(500)
    cy.get('select').eq(1).should('not.contain', 'KABUPATEN SUMEDANG')
  })

  it('TC-04: User checkout produk yang telah dibeli namun tidak memilih Kabupaten/kota', () => {
    cy.wait(200)
    cy.get("button:contains('Ubah alamat pengiriman')").focus().click({ force: true })
    cy.wait(500)
    cy.get('textarea').type("Puri Indah Jatinangor No.21")
    cy.get('select').eq(0).select('JAWA BARAT')
    cy.wait(500)
    cy.get('select').eq(2).should('not.contain','JATINANGOR')
  })

  it('TC-05: User checkout produk yang telah dibeli namun tidak memilih kecamatan', () => {
    cy.wait(200)
    cy.get("button:contains('Ubah alamat pengiriman')").focus().click({ force: true })
    cy.wait(500)
    cy.get('textarea').type("Puri Indah Jatinangor No.21")
    cy.get('select').eq(0).select('JAWA BARAT')
    cy.wait(500)
    cy.get('select').eq(1).select('KABUPATEN SUMEDANG')
    cy.wait(500)
    cy.get('select').eq(3).should('not.contain','CIKERUH')
  })
})
