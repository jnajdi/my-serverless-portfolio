import React from 'react';
import { shallow, mount, render, configure }  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ExampleWorkModal from '../js/example-work-modal';

configure({adapter: new Adapter()});

const myExample =
  {
    'title': "Work Example",
    'href': "http://example.com",
    'desc': "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    'image': {
      'desc': "example screenshot of a project involving chemistry",
      'src': "images/example2.png",
      'comment': ""
    }
  };



  describe("ExampleWorkModal Component", () => {
    let mockCloseModalFn = jest.fn();

    let component = shallow(<ExampleWorkModal example={myExample} open={false}/>);

    let openComponent = shallow(<ExampleWorkModal example={myExample} open={true} closeModal={mockCloseModalFn}/>);

    let anchors = component.find("a");

    it("SHould contain a single 'a' element", () => {
      expect(anchors.length).toEqual(1);
    });

    it("Should link to our project", () => {
      expect(anchors.getElement(0).props.href).toEqual(myExample.href);
    });

    it("Should have the modal class set correctly", () => {
      expect(component.find(".background--skyBlue").hasClass("modal--closed")).toBe(true);
      expect(openComponent.find(".background--skyBlue").hasClass("modal--open")).toBe(true);
    });

    it("Should close the modal", () => {
      openComponent.find(".color--cloud").find(".modal__closeButton").simulate('click');
      expect(mockCloseModalFn).toHaveBeenCalled();

    })
  });
